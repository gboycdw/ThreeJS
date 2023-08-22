interface ControllerType {
  setBrouserWidth: React.Dispatch<React.SetStateAction<number>>;
  setBrouserHeight: React.Dispatch<React.SetStateAction<number>>;
  setCameraDepth: React.Dispatch<React.SetStateAction<number>>;
}

function ControllBox(props: ControllerType) {
  const { setBrouserWidth, setBrouserHeight, setCameraDepth } = props;

  return (
    <div>
      <div>Controller</div>
      <div>
        <a>화면 사이즈 조정</a>
        <input
          style={{ width: "42px", border: "1px solid", textAlign: "center" }}
          // className="w-50px h-10px"
          defaultValue={1024}
          onChange={(e) => {
            setBrouserWidth(parseInt(e.target.value));
          }}
        />
        <input
          style={{ width: "42px", border: "1px solid", textAlign: "center" }}
          // className="w-50px h-10px"
          defaultValue={768}
          onChange={(e) => {
            setBrouserHeight(parseInt(e.target.value));
          }}
        />
      </div>
      <div>
        <a>카메라 원근 조정</a>
        <input
          style={{ width: "42px", border: "1px solid", textAlign: "center" }}
          // className="w-50px h-10px"
          type="number"
          // defaultValue={5}
          onChange={(e) => {
            setCameraDepth(parseInt(e.target.value));
          }}
        />
      </div>
    </div>
  );
}

export default ControllBox;
