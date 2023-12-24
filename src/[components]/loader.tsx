import GridLoader from "react-spinners/PuffLoader";

export const Loader = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
          <GridLoader size={150} color="#2d50be" />
        </div>
    );    
}