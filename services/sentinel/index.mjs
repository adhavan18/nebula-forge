export const handler = async (event) => {
  const releaseId = event.detail?.releaseId ?? 'unknown';
  const healthy = event.detail?.errorRate === undefined || Number(event.detail.errorRate) < 0.02;
  return { releaseId, decision: healthy ? 'PROMOTE' : 'QUARANTINE', reason: healthy ? 'signals within SLO' : 'error rate exceeded 2%' };
};
