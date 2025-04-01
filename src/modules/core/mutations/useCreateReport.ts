import { useMutation } from "@tanstack/react-query";
import { reportGateway } from "@/modules/core/gateway-infra/api.report-gateway";
import { useToast } from "@/app/_hooks/use-toast";
import { CreateReportDto } from "@/modules/core/model/Report";

export function useCreateReport() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (report: CreateReportDto) => reportGateway.createReport(report),
    onSettled: (_data, error) => {
      if (error) {
        toast({
          title: "Erreur lors de l'envoi du signalement",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signalement envoyé",
          description: "Merci de nous avoir signalé ce contenu",
        });
      }
    },
  });
}
