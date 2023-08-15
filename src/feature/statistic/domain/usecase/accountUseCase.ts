import AccountStatistic from '../../data/model/accountStatistic';
import AccountRepository from '../../data/repository/accountRepository';

class GetAccountStatisticsUseCase {
	constructor(private accountRepository: AccountRepository) {}

	async execute(): Promise<AccountStatistic[]> {
		try {
			const accountStatistics =
				await this.accountRepository.getAllAccounts();
			return accountStatistics;
		} catch (error) {
			// Aqui você pode lidar com erros, fazer logging, ou lançar uma exceção personalizada
			throw new Error('Failed to get account statistics');
		}
	}
}

export default GetAccountStatisticsUseCase;
