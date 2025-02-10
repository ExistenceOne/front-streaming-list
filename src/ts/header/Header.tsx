import "../../styles/header/Header.css"

export default function Header() {
  return (
    <header>
      <div className="flex items-center border-b-2 h-12 font-bold text-xl mx-auto px-10 text-white bg-black">
        <h2 className="f-24">치지직 스트리밍 목록</h2>
      </div>
    </header>
  );
}
