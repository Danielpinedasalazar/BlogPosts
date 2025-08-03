import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    const stringData = typeof data === 'string' ? data : data.toString(); // Convierte Buffer a string si es necesario
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(stringData, salt); // Solo se pasa string
  }

  comparePassword(data: string | Buffer, encrypted: string): Promise<boolean> {
    const stringData = typeof data === 'string' ? data : data.toString(); // Igual que arriba
    return bcrypt.compare(stringData, encrypted); // Solo se pasa string
  }
}
