import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    //Inject jwtConfigurstion
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    //Inject usersService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    //Inject generateTOkensProvider
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      //verify the Google Token sent by the user
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      // Extract the payload form Google JWT
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();
      // Find the user in the database using the GoogleId
      const user = await this.usersService.findOneByGoogleId(googleId);
      //If GoogleId exists generate token
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      }
      //If not create a new user and then generate tokens
      const newUser = await this.usersService.createGoogleUser({
        email: email,
        firstName: firstName,
        lastName: lastName,
        googleId: googleId,
      });
      return this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      //throw unauthorized exception
      throw new UnauthorizedException(error);
    }
  }
}
