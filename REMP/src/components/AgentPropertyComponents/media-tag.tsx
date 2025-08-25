import { Camera, Compass, Layout, Video } from "lucide-react";
import { MediaAvailable } from "../../interface/agent-property";

interface MediaTagProps{
  medias:MediaAvailable
}

const mediaIcons: Record<keyof MediaAvailable, React.ReactNode> = {
  photography: <Camera size={16} />,
  floorPlan: <Layout size={16} />,
  videography: <Video size={16} />,
  vrTour: <Compass size={16} />
}

const mediaDisplayNames: Record<keyof MediaAvailable, string> = {
  photography: 'Photography',
  floorPlan: 'Floor Plan',
  videography: 'Videography',
  vrTour: 'VR Tour'
}

const MediaTag:React.FC<MediaTagProps> = ({medias}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {(Object.keys(medias) as Array<keyof MediaAvailable>).map((service) => {
        if (!medias[service]) return null;

        return (
          <div
            key={service}
            className="flex items-center bg-gray-100 px-3 py-1 rounded-md text-sm"
          >
            {mediaIcons[service]}
            <span className="ml-2">{mediaDisplayNames[service]}</span>
          </div>
        );
      })}
    </div>
  );
}

export default MediaTag;  
