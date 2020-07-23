import { LoggingService } from './logging.service';
import { Injectable } from '@angular/core';

@Injectable()
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

  constructor(private loggingService: LoggingService) {}

  addAccount(accountName: string, accountStatus: string) {
    this.accounts.push({ name: accountName, status: accountStatus });
    this.loggingService.logStatusChange(accountStatus);
  }

  updateStatus(id: number, newStatus: string) {
    this.accounts[id].status = newStatus;
    this.loggingService.logStatusChange(newStatus);
  }
}
