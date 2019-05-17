/* 检查本地keystone用户名和密码是否正确 */

import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError } from 'rxjs/';
import { ApiProvider } from './api.service';
import { AppConst } from '../models/model';
import { environment } from '../../environments/environment';
import { User } from '../models/model';
import { TranslateService } from '@ngx-translate/core';


// TODO: 提示信息的多语言翻译还没完成
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserCheckService {
  // 获取环境配置文件中的参数：后台API路径
  private storeApiPath: string = environment.storeApiPath;

  constructor(
    public apiProvider: ApiProvider,
    public translate: TranslateService
    ) {}

  checkUser(user: User): Observable<Response>  {
    const userCheckUrl = this.storeApiPath + AppConst.STORE_API_PATHS.userCheck;
    return this.apiProvider.httpPost(userCheckUrl, user, httpOptions)
      .pipe(
        catchError(this.handelError)
      );
  }

  private handelError(err: HttpErrorResponse | any) {
    const translateNetworkErr = _('发生客户端或网络错误');
    const translate401Err = _('您输入的电子邮件和密码无效。');
    const translate403Err = _('服务器禁止： 无效CSRF');
    const translateServerErr = _('服务器故障,请联系管理员');

    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it here.
      console.error('An error occurred:', err.error.message);
      return throwError(translateNetworkErr);
    } else {
      // The backend returned an unsucessful response code.
      // The response body may contain clues as to what went wrong.
      if (err.status === 401) {
        return throwError(translate401Err);
      }
      if (err.status === 403) {
        return throwError(translate403Err);
      }
      // console.error(`Backend returned code ${err.status}` + `body was: ${JSON.stringify(err.error)}`);
    }

    return throwError(translateServerErr);
  }

}
