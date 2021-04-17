import { ActivatedRoute, Params, Router } from '@angular/router';

const updateUrlQueryParams = async (
  router: Router,
  activatedRoute: ActivatedRoute,
  queryParams: Params
): Promise<void> => {
  await router.navigate(['.'], {
    relativeTo: activatedRoute,
    queryParams,
  });
};

/**
 * Set Demo Query Params
 *
 * @param activatedRoute
 * @param router
 * @param queryParams
 */
export const setDemoQueryParam = (activatedRoute: ActivatedRoute, router: Router, queryParams: Params): Params => {
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

    updateUrlQueryParams(router, activatedRoute, queryParams);
  }

  return queryParams;
};
