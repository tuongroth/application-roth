import { get, last, first } from 'lodash';

const serializeCursor = data =>
  Buffer.from(JSON.stringify(data)).toString('base64');

const parseCursor = cursor => {
  try {
    return JSON.parse(Buffer.from(cursor, 'base64').toString('ascii'));
  } catch {
    return undefined;
  }
};

const getComparator = orderDirection => (orderDirection === 'asc' ? '>' : '<');

const createPaginationQuery = async (getQuery, options = {}) => {
  const {
    first: firstCount = 30,
    after,
    orderDirection = 'asc',
    orderColumn,
    idColumn = 'id',
  } = options;

  const parsedCursor = after ? parseCursor(after) : undefined;

  let paginatedQuery = getQuery();

  if (parsedCursor) {
    const [idValue, orderColumnValue] = parsedCursor;

    console.log(parsedCursor);

    paginatedQuery = paginatedQuery
      .where(orderColumn, getComparator(orderDirection), orderColumnValue)
      .orWhere(qb =>
        qb
          .where(orderColumn, '=', orderColumnValue)
          .andWhere(idColumn, getComparator(orderDirection), idValue),
      );
  }

  paginatedQuery = paginatedQuery
    .orderBy([
      { column: orderColumn, order: orderDirection },
      { column: idColumn, order: orderDirection },
    ])
    .limit(firstCount + 1);

  const totalCount = await getQuery().count('*', { as: 'count' });
  const data = await paginatedQuery;

  console.log(data);

  const edges = data.slice(0, firstCount).map(d => ({
    node: d,
    cursor: serializeCursor([d[idColumn], d[orderColumn]]),
  }));

  return {
    pageInfo: {
      totalCount: totalCount[0]['count'],
      hasNextPage: data.length > firstCount,
      endCursor: get(last(edges), 'cursor'),
      startCursor: get(first(edges), 'cursor'),
    },
    edges,
  };
};

export default createPaginationQuery;
