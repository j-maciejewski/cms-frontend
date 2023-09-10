// import { axiosGet, hasProperty, hasStringProperty, uploadImage } from '@/utils'
// import { IMAGE_THUMBNAIL } from '@/consts'

export default async function addFile(file: File, onError: (err: unknown) => void) {
  // try {
  //   const result = await uploadImage(file)
  //   const data = result.data
  //   if (!hasProperty(data, 'file') && hasStringProperty(data.file, 'id'))
  //     throw new Error('Uploaded image has no image id')
  //   const id = result.data.file.id
  //   const src = `${process.env.API_URL}${IMAGE_THUMBNAIL}/${id}`
  //   await axiosGet(`${IMAGE_THUMBNAIL}/${id}`)
  //   return { id, src }
  // } catch (err: unknown) {
  //   console.log(err)
  //   if (onError) onError(err)
  // }
}
