import { ActivatedRoute, Params, Router } from '@angular/router';

const updateUrlQueryParams = (
  activatedRoute: ActivatedRoute,
  router: Router,
  queryParams: Params
): void => {
  router.navigate(['.'], {
    relativeTo: activatedRoute,
    queryParams,
  });
};

export const setDemoQueryParam = (
  activatedRoute: ActivatedRoute,
  router: Router,
  queryParams: Params
) => {
  const demoQueryParam = activatedRoute.snapshot.queryParams['demo'];

  if (demoQueryParam) {
    queryParams = {
      ...queryParams,
      demo: demoQueryParam,
    };
  } else {
    queryParams = {
      ...queryParams,
      demo: 1,
    };

    updateUrlQueryParams(activatedRoute, router, queryParams);
  }

  return queryParams;
};
