import AccountDataSource from "../datasource/accountDataSource";
import AccountStatistic from "../model/accountStatistic";

class AccountRepository {
    constructor(private dataSource: AccountDataSource) {}

    async getAllAccounts(): Promise<AccountStatistic[]> {
        try {
            const data = await this.dataSource.fetchAccounts();
            
            // Supondo que 'data' é um array de objetos que você deseja mapear para AccountStatistic
            const accountStatistics: AccountStatistic[] = data.map(item => {
                // Você deve definir aqui como mapear os dados do objeto 'item' para um objeto AccountStatistic
                return new AccountStatistic(); // Substitua isso pela lógica de mapeamento real
            });

            return accountStatistics;
        } catch (error) {
            throw new Error('Error getting account statistics');
        }
    }
}

export default AccountRepository;
