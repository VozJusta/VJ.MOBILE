import { useNotifications } from "@/hooks/notifications/useNotifications";
import { deleteAllNotifications } from "@/services/shared/notifications/deleteNotifications/all";
import { deleteNotificationById } from "@/services/shared/notifications/deleteNotifications/byId";
import { updateAllNotifications } from "@/services/shared/notifications/updateNotification/all";
import NotificationTemplate from "@/template/notification";
import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Toast from "react-native-toast-message";
import { MaterialIcons } from "@expo/vector-icons";

export default function Notifications() {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingMarkRead, setLoadingMarkRead] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
    setNotifications,
    fetchPage,
  } = useNotifications();

  const handleDeleteAll = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDeleteAll = async () => {
    setShowConfirmModal(false);
    setLoadingDelete(true);
    try {
      const response = await deleteAllNotifications();
      if (response.success) {
        setNotifications([]);
        Toast.show({
          type: "success",
          text1: "Notificações excluídas com sucesso",
        });
        fetchPage(1);
      } else {
        Toast.show({
          type: "error",
          text1: response.message ?? "Erro ao excluir notificações",
        });
      }
    } finally {
      setLoadingDelete(false);
    }
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
        fetchPage(page);
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

  const handleDeleteOneNotification = async (id: string) => {
    try {
      const response = await deleteNotificationById(id);
      if (response.success) {
        Toast.show({ type: "success", text1: "Notificação excluída" });
        fetchPage(page);
      } else {
        Toast.show({
          type: "error",
          text1: response.message ?? "Erro ao excluir notificação",
        });
      }
    } catch {
      Toast.show({ type: "error", text1: "Erro ao excluir notificação" });
    }
  };

  return (
    <>
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
        onDeleteOneNotification={handleDeleteOneNotification}
        loadingDeleteAll={loadingDelete}
        loadingMarkAllAsRead={loadingMarkRead}
      />

      <Modal
        transparent
        visible={showConfirmModal}
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowConfirmModal(false)}>
          <View className="flex-1 bg-black/60 items-center justify-center px-6">
            <TouchableWithoutFeedback>
              <View className="bg-[#1E293B] rounded-2xl p-6 w-full gap-4">

                <View className="items-center">
                  <View className="bg-red-500/20 rounded-full p-4">
                    <MaterialIcons name="delete-sweep" size={32} color="#EF4444" />
                  </View>
                </View>

                <View className="items-center gap-2">
                  <Text className="font-interSemiBold text-white text-[18px] text-center">
                    Limpar tudo
                  </Text>
                  <Text className="font-interRegular text-[#94A3B8] text-[14px] text-center">
                    Tem certeza que deseja excluir todas as notificações? Essa ação não pode ser desfeita.
                  </Text>
                </View>

                <View className="flex-row gap-3 mt-2">
                  <TouchableOpacity
                    onPress={() => setShowConfirmModal(false)}
                    className="flex-1 border border-[#334155] rounded-xl py-3 items-center"
                  >
                    <Text className="font-interSemiBold text-[#94A3B8] text-[14px]">
                      Cancelar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleConfirmDeleteAll}
                    className="flex-1 bg-red-500 rounded-xl py-3 items-center"
                  >
                    <Text className="font-interSemiBold text-white text-[14px]">
                      Limpar
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}