import api from "../config/axios";

const mediaAssetApi = {
  deleteMedia: (id:number) => 
    api.delete(`/MediaAsset/${id}/delete`),

  downloadMedia: (id: number) => 
    api.get(`/MediaAsset/downloadMedia/${id}`, {
      responseType: 'blob' 
    }),

}

export default mediaAssetApi;