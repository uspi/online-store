import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { StoreComponent } from "./store.component";

@Injectable()
export class StoreFirstGuard {
  private firstNavigation = true;

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      // if not first navigation
      if (!this.firstNavigation) {
        return true;
      }

      // if first navigation
      this.firstNavigation = false;

      // if the calling component not store
      if (route.component != StoreComponent) {
        this.router.navigateByUrl("/");
        return false;
      }

      // if the calling component is store
      return true;
    }
}
