import './assets/css/home.css'


const Test = () => {
  function handleDropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  return (
    <div className="dropdown">
      <button onClick={handleDropDown} className="dropbtn">Dropdown</button>
      <div id="myDropdown" className="dropdown-content">
        <div>Tất cả</div>
        <div>Đã cào</div>
        <div>Chưa cào</div>
      </div>
    </div>
  )
}

export default Test;