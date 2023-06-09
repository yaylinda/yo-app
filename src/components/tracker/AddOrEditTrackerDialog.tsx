import { FontAwesome5 } from '@expo/vector-icons';
import { Button, FormControl, Icon, Input, Modal } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import { BG,  PRESSED_BG_WHITE } from '../../styles';

const AddOrEditTrackerDialog = () => {
    const { addOrEditTrackerDialog, closeAddOrEditTrackerDialog, addTracker, updateTracker } = useUserStore();

    const isEdit = !!addOrEditTrackerDialog.trackerId;

    const initialRef = React.useRef(null);
    const [newTrackerName, setNewTrackerName] = React.useState<string>('');
    const [validationError, setValidationError] = React.useState<string>('');

    React.useEffect(() => {
        if (addOrEditTrackerDialog.isOpen) {
            setNewTrackerName(addOrEditTrackerDialog.trackerName);
        } else {
            setNewTrackerName('');
        }
    }, [addOrEditTrackerDialog.trackerName, addOrEditTrackerDialog.isOpen]);

    const onInputChange = (value: string) => {
        setValidationError('');
        setNewTrackerName(value);
    };

    const isValid = (): boolean => {
        if (!newTrackerName) {
            setValidationError('Please enter a tracker name');
            return false;
        }
        // TODO - other validation checks
        return true;
    };

    const onSave = () => {
        if (!isValid()) {
            return;
        }

        if (isEdit) {
            updateTracker(addOrEditTrackerDialog.trackerId!, newTrackerName);
        } else {
            addTracker(newTrackerName);
        }
    };

    return (
        <Modal
            isOpen={addOrEditTrackerDialog.isOpen}
            onClose={closeAddOrEditTrackerDialog}
            avoidKeyboard
            initialFocusRef={initialRef}
        >
            <Modal.Content>
                <Modal.Header>
                    {isEdit ? 'Update Tracker Name' : 'Add New Tracker'}
                </Modal.Header>
                <Modal.Body>
                    <FormControl isInvalid={!!validationError}>
                        <Input
                            ref={initialRef}
                            variant="rounded"
                            placeholder="New Tracker Name"
                            size="md"
                            value={newTrackerName}
                            onChangeText={onInputChange}
                            color="white"
                            borderColor="gray.200"
                            placeholderTextColor="gray.200"
                            _focus={{
                                borderColor: 'white',
                            }}
                        />
                        <FormControl.ErrorMessage
                            leftIcon={
                                <Icon
                                    as={FontAwesome5}
                                    name="exclamation-circle"
                                    size="xs"
                                />
                            }
                        >
                            {validationError}
                        </FormControl.ErrorMessage>
                    </FormControl>
                </Modal.Body>
                <Modal.Footer justifyContent="space-between">
                    <Button
                        bg={BG}
                        borderRadius="full"
                        _pressed={{
                            bg: PRESSED_BG_WHITE,
                        }}
                        onPress={closeAddOrEditTrackerDialog}
                        leftIcon={
                            <Icon
                                as={FontAwesome5}
                                name="times"
                                color="red.500"
                                textAlign="center"
                            />
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        bg={BG}
                        borderRadius="full"
                        _pressed={{
                            bg: PRESSED_BG_WHITE,
                        }}
                        onPress={onSave}
                        leftIcon={
                            <Icon
                                as={FontAwesome5}
                                name="check"
                                color="green.500"
                                textAlign="center"
                            />
                        }
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

export default AddOrEditTrackerDialog;