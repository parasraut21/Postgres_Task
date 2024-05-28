// wallet-addresses.controller.ts

import { Controller, Delete, Param } from '@nestjs/common';
import { WalletAddressesService } from './wallet-addresses.service';

@Controller('wallet-addresses')
export class WalletAddressesController {
  constructor(private readonly walletAddressesService: WalletAddressesService) {}

  @Delete(':id')
  async deleteWalletAddress(@Param('id') id: string): Promise<void> {
    await this.walletAddressesService.deleteWalletAddress(id);
  }
}
