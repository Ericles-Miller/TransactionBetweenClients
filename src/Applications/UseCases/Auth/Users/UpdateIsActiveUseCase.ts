import { UserIsActiveRequestDTO } from '@Applications/DTOs/Requests/Auth/users/UserIsActiveRequestDTO';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { MapperUser } from '@Applications/Mappings/Users/MapperUser';
import { LoggerConstants } from '@Domain/Constants/LoggerConstants';
import { UserErrorMessages } from '@Domain/Exceptions/Errors/Auth/UserErrorMessages';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { GenericErrorMessages } from '@Domain/Exceptions/Shared/GenericErrorMessages';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import LoggerComponent from '@Infra/Logging/LoggerComponent';
import { databaseResponseTimeHistogram } from '@Infra/Metrics/metrics';
import { inject, injectable } from 'inversify';


@injectable()
export class UpdateIsActiveUseCase {
  private readonly logger = new LoggerComponent(UpdateIsActiveUseCase.name);
  private readonly mapperUser = new MapperUser();

  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUserRepository,    
  ) {}

  async execute({id, isActive}: UserIsActiveRequestDTO) : Promise<void> {
    const metricsLabels = { operation: 'updateIsActiveUsers' };
    const timer = databaseResponseTimeHistogram.startTimer();
    
    try {
      this.logger.info(LoggerConstants.updateIsActive);

      const user = await this.usersRepository.getById(id);
      if(!user)
        throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidId), 404);
  
      const mapperUser = this.mapperUser.mapperPrismaToUser(user);
      mapperUser.setIsActive(isActive);
  
      await this.usersRepository.updateIsActive(id, mapperUser.isActive);

      this.logger.info(LoggerConstants.finishedMethod);
      timer({ ...metricsLabels, success: 'true' });

    } catch (error) {
      if(error instanceof AppError) {
        this.logger.warn(GenericErrorMessages.invalidAction, error);
        throw error;
      }

      this.logger.error(UserErrorMessages.unexpectedUpdateIsActive, error);
      timer({ ...metricsLabels, success: 'false' });
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.unexpectedUpdateIsActive), 500);
    }
  }
}