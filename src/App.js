import { ImageCard } from "./components/ImageCard";
import { useEffect, useState } from "react";

export default function App() {
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [term, setTerm] = useState("");

	useEffect(() => {
		fetch(
			//`https://pixabay.com/api/?key=25742989-a7b4c56eb69c40d6bb7f373d9&q=yellow+flowers&image_type=photo&pretty=true`
			`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
		)
			.then((response) => response.json())
			.then((data) => {
				setImages(data.hits);
				setIsLoading(false);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-3 gap-4">
				{images.map((image) => (
					<ImageCard key={image.id} image={image} />
				))}
			</div>
		</div>
	);
}
