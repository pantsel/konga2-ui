import {Injectable, ErrorHandler} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { NotificationService } from '../notifications/notification.service';
import {AppEvent, AppEventsService} from '@app/core/app-events/app-events.service';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private notificationsService: NotificationService,
              private translateService: TranslateService,
              private events: AppEventsService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {

    const message = _.get(error, 'error.message', error['statusText']) || 'An unknown error has occurred';

    let displayMessage = this.translateService.instant(message) + '.';

    if (!environment.production) {
      displayMessage += ' See console for details.';
    }

    this.notificationsService.error(displayMessage);

    // const store = this.injector.get(AuthService);
    if (error['status'] === 401 ) { this.events.emit(new AppEvent('logout')) }

    super.handleError(error);
  }
}
