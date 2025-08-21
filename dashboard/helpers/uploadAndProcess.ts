/**
 * Guarda un gasto en la tabla 'boletas' de Supabase
 * @param expense - Objeto con los datos del gasto
 */
export async function saveExpense(expense: Partial<import('@/lib/supabaseClient').Boleta>) {
    if ('category' in expense) {
      delete expense.category;
    }
    // Eliminar campos que no existen en la tabla
    if ('description' in expense) {
      delete expense.description;
    }
    // Si existe 'text', usarlo como 'text' (asumiendo que la columna en Supabase es 'text')
    // Si la columna es diferente, reemplazar 'text' por el nombre correcto
    // No modificar el nombre del campo, solo eliminar el campo description
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Usuario no autenticado');
    // Agregar el user_id si no está
    // Si viene 'amount' del formulario, renombrar a 'total_amount'
    const expenseData = { ...expense, user_id: user.id };
    // Eliminar campos que no existen en la tabla
    const { data, error } = await supabase
      .from('boletas')
      .insert([expenseData]);
    if (error) {
      console.error('Error guardando gasto:', error.message || error.details || error);
      throw new Error(error.message || error.details || JSON.stringify(error));
    }
    return data;
  } catch (error) {
    console.error('Error guardando gasto:', error);
    throw error;
  }
}
import { supabase } from '@/lib/supabaseClient'
import { OCRResponse } from '@/lib/supabaseClient'

/**
 * Sube una imagen a Supabase Storage y la procesa con OCR
 * 
 * @param file - Archivo de imagen a procesar
 * @returns Promise con el resultado del OCR
 */
export async function uploadAndProcess(file: File): Promise<OCRResponse> {
  try {
    // Obtener usuario autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      throw new Error('Usuario no autenticado')
    }

    // Obtener token de sesión
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token
    if (!token) {
      throw new Error('Token de sesión no disponible')
    }

    // Generar nombre único para el archivo
    const fileExtension = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}-${file.name}`
    const path = `receipts/${user.id}/${fileName}`

    // Subir archivo a Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('receipts')
      .upload(path, file, { 
        upsert: false,
        contentType: file.type
      })

    if (uploadError) {
      console.error('Error subiendo archivo:', uploadError)
      throw new Error(`Error subiendo archivo: ${uploadError.message}`)
    }

    // Crear URL firmada para acceso temporal
    const { data: signedData, error: signedError } = await supabase.storage
      .from('receipts')
      .createSignedUrl(path, 300) // 5 minutos

    if (signedError || !signedData?.signedUrl) {
      throw new Error('Error creando URL firmada')
    }

    // Llamar al backend para procesar OCR
    // Detectar automáticamente el host del frontend y usar el mismo para el backend OCR
    let apiUrl = process.env.NEXT_PUBLIC_API_URL
    const ocrPort = process.env.NEXT_PUBLIC_OCR_API_PORT || "8001"
    if (!apiUrl) {
      let hostname = window.location.hostname
      if (hostname === "localhost") hostname = "127.0.0.1"
      apiUrl = `http://${hostname}:${ocrPort}`
    }
    const response = await fetch(`${apiUrl}/ocr/from-storage`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        signedUrl: signedData.signedUrl,
        nombre_archivo: file.name
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `Error del servidor: ${response.status}`)
    }

    const result: OCRResponse = await response.json()
    
    if (result.success) {
      console.log('OCR procesado exitosamente:', result.boleta)
    } else {
      console.error('Error en OCR:', result.error)
    }

    return result

  } catch (error) {
    console.error('Error en uploadAndProcess:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

/**
 * Obtiene la lista de boletas del usuario con paginación
 * 
 * @param page - Número de página (1-based)
 * @param limit - Límite de items por página
 * @returns Promise con la lista paginada de boletas
 */
export async function getBoletas(page: number = 1, limit: number = 20) {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token
    
    if (!token) {
      throw new Error('Token de sesión no disponible')
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001'
    const response = await fetch(
      `${apiUrl}/boletas?page=${page}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`)
    }

    return await response.json()

  } catch (error) {
    console.error('Error obteniendo boletas:', error)
    throw error
  }
}

/**
 * Obtiene estadísticas de las boletas del usuario
 * 
 * @returns Promise con las estadísticas
 */
export async function getBoletasStats() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token
    
    if (!token) {
      throw new Error('Token de sesión no disponible')
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001'
    const response = await fetch(`${apiUrl}/boletas/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`)
    }

    return await response.json()

  } catch (error) {
    console.error('Error obteniendo estadísticas:', error)
    throw error
  }
}
