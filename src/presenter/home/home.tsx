import DebtManagementForm from '../form/DebtManagementForm';
function Home() {
	return (
		<div className='app' style={{ width: '100%' }}>
			<div className='row'>
				<div className='mixed-chart'>
					<DebtManagementForm />
				</div>
			</div>
		</div>
	);
}

export default Home;
