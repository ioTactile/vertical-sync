import { useMutation } from '@tanstack/react-query';
import { reportGateway } from '@/modules/core/gateway-infra/api.report-gateway';
import { notify } from '@/modules/core/ports/notifier';
import { CreateReportDto } from '@/modules/core/model/Report';

export function useCreateReport() {
  return useMutation({
    mutationFn: (report: CreateReportDto) => reportGateway.createReport(report),
    onSettled: (_data, error) => {
      if (error) {
        notify({
          title: "Erreur lors de l'envoi du signalement",
          description: error.message,
          variant: 'destructive',
        });
      } else {
        notify({
          title: 'Signalement envoyé',
          description: 'Merci de nous avoir signalé ce contenu',
        });
      }
    },
  });
}
