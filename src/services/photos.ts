import { Photo } from "../types/photo";
import { storage } from "../libs/firebase";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

export const getAll = async () => {
  let list: Photo[] = [];

  const imagesFolder = ref(storage, "Photos");
  const photoList = await listAll(imagesFolder);

  for (let i in photoList.items) {
    list.push({
      name: photoList.items[i].name,
      url: await getDownloadURL(photoList.items[i]),
    });
  }

  return list;
};

export const upload = async (file: File) => {
  console.log(file.type);
  let validFileExtensions = [
    "image/jpg",
    "image/jpeg",
    "image/bmp",
    "image/gif",
    "image/png",
  ];
  if (validFileExtensions.includes(file.type)) {
    let newFile = ref(storage, `Photos/${file.name}`);
    let upload = await uploadBytes(newFile, file);
    let photoUrl = await getDownloadURL(upload.ref);

    return {
      name: upload.ref.name,
      url: photoUrl,
    } as Photo;
  } else {
    return new Error(file.type);
  }
};

export const deletePhoto = async (name: string) => {
  const image = ref(storage, `Photos/${name}`);
  await deleteObject(image);
};
