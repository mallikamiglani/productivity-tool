import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
    if (!file) return;
    console.log("testing file access", process.env.NEXT_PUBLIC_DATABASE_ID);
    console.log("testing bucket id:", process.env.STORAGE_BUCKET_ID!);
    const fileUploaded = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID!,
        ID.unique(),
        file
    );

    return fileUploaded;
}

export default uploadImage;