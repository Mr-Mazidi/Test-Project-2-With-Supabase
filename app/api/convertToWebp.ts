
export async function convertToWebp(file: File): Promise<File> {

    const image = new Image()

    const imageUrl = URL.createObjectURL(file)
    image.src = imageUrl

    await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve()
        image.onerror = () => reject(new Error("Image loading failed"))
    })

    const canvas = document.createElement("canvas")

    canvas.width = image.width
    canvas.height = image.height

    const context = canvas.getContext("2d")

    if (!context) throw new Error("Canvas context is not available")

    context.drawImage(image, 0, 0)

    const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/webp", 0.8)
    })

    URL.revokeObjectURL(imageUrl)
    if (!blob) throw new Error("WebP conversion failed")

    return new File(
        [blob],
        `${crypto.randomUUID()}.webp`,
        {
            type: "image/webp"
        }
    )
}