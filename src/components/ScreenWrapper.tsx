import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { HStack, useSafeArea, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';

interface ScreenWrapperProps {
    header: React.ReactNode;
    content: React.ReactNode;
    dialogs?: React.ReactNode;
}

const ScreenWrapper = ({ header, content, dialogs }: ScreenWrapperProps) => {

    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
    });

    const tabBarHeight = useBottomTabBarHeight();

    const { gradientColors } = useUserStore();

    return (
        <VStack
            bg={{
                linearGradient: {
                    colors: gradientColors,
                    start: [0, 0],
                    end: [0, 1],
                },
            }}
            h="full"
            w="full"
            paddingBottom={tabBarHeight}
        >
            <HStack
                justifyContent="space-between"
                alignItems="center"
                padding={2}
                {...safeAreaProps}
            >
                {header}
            </HStack>
            {content}
            {dialogs}
        </VStack>
    );
};

export default ScreenWrapper;
