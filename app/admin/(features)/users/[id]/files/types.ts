export type FolderItem = {
  id: string;
  name: string;
};

export type FileItem = {
  id: string;
  name: string;
  url: string;
  mimeType: string | null;
};
