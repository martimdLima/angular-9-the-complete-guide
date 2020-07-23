export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active',
    },
    {
      name: 'Test Account',
      status: 'inactive',
    },
    {
      name: 'Hidden Account',
      status: 'unknown',
    },
  ];

  addAccount(accountName: string, accountStatus: string) {
    this.accounts.push({ name: accountName, status: accountStatus });
  }

  updateStatus(id: number, newStatus: string) {
    this.accounts[id].status = newStatus;
  }
}
