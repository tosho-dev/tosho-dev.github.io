import Botan from "./components/Botan";
import CanvasAscii from "./components/CanvasAscii";
import ToshoText from "./components/ToshoText";
import ToshoImage from "./assets/ToshoLogo_RoundComposite.png";

function App() {
	return (
		<>
			<CanvasAscii />
			<main className="flex flex-col justify-center w-screen h-screen items-center gap-4">
				<div className="w-32 h-32">
					<div className="absolute w-32 h-32 bg-[#e49439] rounded-md z-[2] blur-3xl" />
					<img src={ToshoImage} alt="Logo" className="object-contain w-full h-full z-[5] relative" />
				</div>
				<ToshoText />
				<div className="flex flex-row justify-center mt-4 gap-2">
					<Botan href="https://github.com/noaione/tosho-mango/releases">Download</Botan>
					<Botan href="https://github.com/noaione/tosho-mango">GitHub</Botan>
				</div>
			</main>
		</>
	);
}

export default App;
