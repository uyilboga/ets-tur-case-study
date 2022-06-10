const Pagination = ({perPage, totalPage, paginate, currentPage}) => {
	const pageNumbers =  [];

	for(let i = 1; i < Math.ceil(totalPage / perPage) + 1; i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul className="pagination">
				{
					pageNumbers.map((item, index) => (
						<li key={index} className={`page-item ${item === currentPage ? 'active' : ''}`}><a className="page-link" href="#" onClick={() => paginate(item)} >{item}</a></li>
					))
				}
			</ul>
		</nav>
	)
}

export default Pagination