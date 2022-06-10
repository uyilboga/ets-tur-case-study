export default function Layout({ children }) {
	return (
		<>
			<div className="main">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							{children}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}