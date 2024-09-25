import MenuItems from "./MenuItems";

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

    return (
    <div  style={{display: submenus ? 'block' : 'none'}} className={`dropdown-wrapper dropdown-wrapper-lv${depthLevel}`}>
      <div className={`dropdown-wrapper-site dropdown-wrapper-site-lv${depthLevel}`}>
          <ul className={`submenu dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
              {submenus && submenus.map((submenu, index) => (
                  <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
              ))}
          </ul>
      </div>
    </div>



    );
};

export default Dropdown;