import axios from 'axios';
import AccountStatistic from '../model/accountStatistic';

class AccountDataSource {
	private baseUrl =
		'https://gabrielleaotech.com/sistema/accounts/account.php';

	async fetchAccounts(): Promise<AccountStatistic[]> {
		try {
			const response = await axios.get(this.baseUrl);
			return [new AccountStatistic()];
		} catch (error) {
			throw new Error('Error fetching account');
		}
	}
}

export default AccountDataSource;
