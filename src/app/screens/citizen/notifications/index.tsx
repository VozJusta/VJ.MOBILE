import { useNotifications } from "@/hooks/notifications/useNotifications";
import { deleteAllNotifications } from "@/services/shared/notifications/deleteNotifications/all";
import { updateAllNotifications } from "@/services/shared/notifications/updateNotification/all";
import NotificationTemplate from "@/template/notification";
import { useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

export default function Notifications() {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingMarkRead, setLoadingMarkRead] = useState(false);

  const {
    recentNotifications,
    previousNotifications,
    loading,
    page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = useNotifications();

  const handleDeleteAll = () => {
    Alert.alert(
      "Limpar tudo",
      "Tem certeza que deseja excluir todas as notificações? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            setLoadingDelete(true);
            try {
              const response = await deleteAllNotifications();
              if (response.success) {
                Toast.show({
                  type: "success",
                  text1: "Notificações excluídas com sucesso",
                });
              } else {
                Toast.show({
                  type: "error",
                  text1: response.message ?? "Erro ao excluir notificações",
                });
              }
            } finally {
              setLoadingDelete(false);
            }
          },
        },
      ],
    );
  };

  const handleMarkAllAsRead = async () => {
    setLoadingMarkRead(true);
    try {
      const response = await updateAllNotifications();
      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Todas as notificações foram marcadas como lidas",
        });
      } else {
        Toast.show({
          type: "error",
          text1: response.message ?? "Erro ao marcar notificações como lidas",
        });
      }
    } finally {
      setLoadingMarkRead(false);
    }
  };

  return (
    <NotificationTemplate
      recent={recentNotifications}
      previous={previousNotifications}
      loading={loading}
      page={page}
      totalPages={totalPages}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
      goToPage={goToPage}
      onDeleteAll={handleDeleteAll}
      onMarkAllAsRead={handleMarkAllAsRead}
    />
  );
}
