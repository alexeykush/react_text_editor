export const isImage = (file, key) => {
    if(file instanceof File) key = "type";
    return file[key].startsWith("image");
};

export const isLastInArr = (index, arr) => index === arr.length - 1;

export const processFiles = files => files.map(file => window.URL.createObjectURL(file));