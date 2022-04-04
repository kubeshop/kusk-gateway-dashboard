import {useGetApi} from '@models/api';

export function useRawApiSpec(name: string, namespace: string): {[key: string]: any} {
  const {data} = useGetApi({name, namespace, queryParams: {crd: true}});

  if (!data?.raw) {
    return {};
  }

  return data.raw;
}
