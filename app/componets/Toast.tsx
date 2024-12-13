export default function Toast(props:string) {
  return (
    <div className="toast">
      <div className="alert alert-info">
        <span>{props}</span>
      </div>
    </div>
  );
}
