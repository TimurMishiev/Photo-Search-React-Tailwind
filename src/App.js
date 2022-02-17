import { ImageCard } from "./components/ImageCard";
import { useEffect, useState } from "react";
import { ImageSearch } from "./components/ImageSearch";

export default function App() {
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [term, setTerm] = useState("");

	useEffect(() => {
		fetch(
			`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
		)
			.then((response) => response.json())
			.then((data) => {
				setImages(data.hits);
				setIsLoading(false);
			})
			.catch((error) => console.log(error));
	}, [term]);

	return (
		<div className="container mx-auto">
			<ImageSearch searchText={(text) => setTerm(text)} />
			{isLoading ? (
				<h1 className="text-6xl text-center mx-auto mt-32">Loading..</h1>
			) : (
				<div className="grid grid-cols-3 gap-4">
					{images.map((image, index) => (
						<ImageCard key={index} image={image} />
					))}
				</div>
			)}
		</div>
	);
}
