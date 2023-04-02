import { produce } from 'immer';
import { Button, Input, Modal, VStack } from 'native-base';
import React from 'react';
import uuid from 'react-native-uuid';
import useUserStore from '../stores/userStore';
import type { ClosableProps, Tracker } from '../types';

const EMPTY_TRACKER = (): Tracker => ({
    id: uuid.v4() as string,
    displayName: '',
    emoji: '',
    valueOptionsMap: {
        yes: {
            value: 'yes',
            label: 'Yes',
            icon: 'check',
            color: 'green.500',
        },
        no: {
            value: 'no',
            label: 'No',
            icon: 'times',
            color: 'red.500',
        }
    },
});

const AddTrackerModal = ({isOpen, onClose}: ClosableProps) => {
    const { addTracker } = useUserStore();

    const [newTracker, setNewTracker] = React.useState<Tracker>(EMPTY_TRACKER());

    React.useEffect(() => {
        if (!isOpen) {
            setNewTracker(EMPTY_TRACKER());
        }
    }, [isOpen]);

    const onSave = () => {
        addTracker(newTracker);
        onClose();
    };

    const updateTrackerField = (fieldName: string, value: string) => {
        setNewTracker((tracker) => produce(tracker, (draft) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            draft[fieldName] = value;
        }));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} avoidKeyboard>
            <Modal.Content>
                <Modal.Body>
                    <VStack space={4}>
                        <Input
                            variant="rounded"
                            value={newTracker.displayName}
                            onChangeText={(value) => updateTrackerField('displayName', value)}
                            placeholder="Add a new tracker"
                        />
                        <Button
                            variant="ghost"
                            disabled={!newTracker}
                            onPress={onSave}
                        >
                            Save
                        </Button>
                    </VStack>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
};

export default AddTrackerModal;