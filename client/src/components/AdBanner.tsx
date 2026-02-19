import { useEffect } from "react";

export default function AdBanner() {
	useEffect(() => {
		try {
			// @ts-ignore
			(adsbygoogle = window.adsbygoogle || []).push({});
		} catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<div style={{ margin: "20px 0", textAlign: "center" }}>
			<ins
				className="adsbygoogle"
				style={{ display: "block" }}
				data-ad-client="ca-pub-9789327885520093"
				data-ad-slot="6232254865"
				data-ad-format="auto"
				data-full-width-responsive="true"
			></ins>
		</div>
	);
}
