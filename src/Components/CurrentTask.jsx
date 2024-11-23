import folderImage from '../assets/folder.png';
export default function CurrentTask({ currentTask }) {
  return (
    <>
      <img className="absolute z-0 w-1/2" src={folderImage} alt="" />
      <div className="z-10 w-1/3 "></div>
      <div className="z-10 w-2/5 p-6 mx-auto border border-black h-3/5">
        <h2 className="mb-4 text-xl font-semibold text-center text-gray-700 shadows-into-light-regular">
          {currentTask.description}
        </h2>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">{currentTask.clues}</p>
        </div>
      </div>
    </>
  );
}
