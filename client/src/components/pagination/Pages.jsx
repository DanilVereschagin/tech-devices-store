import React, { useContext } from 'react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { Pagination } from 'react-bootstrap';

const Pages = observer(() => {
	const { device } = useContext(Context);
	const pageCount = Math.ceil(device.totalCount / device.limit);
	const pages = [];

	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1);
	}

	return (
		<Pagination className='mt-5'>
			{pages.map((page) => (
				<Pagination.Item
					key={page}
					active={page === device.page}
					onClick={() => device.setPage(page)}
				>
					{page}
				</Pagination.Item>
			))}
		</Pagination>
	);
});

export default Pages;
