import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.component.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((obj) => (
        <DirectoryItem category={obj} key={obj.id} />
      ))}
    </div>
  );
};

export default Directory;
