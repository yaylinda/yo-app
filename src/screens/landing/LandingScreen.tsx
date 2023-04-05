import moment from 'moment';
import { Button, Center, Slide, useSafeArea, VStack } from 'native-base';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import useUserStore from '../../stores/userStore';
import { getWeekStart } from '../../utilities';
import LandingScreenHeader from './LandingScreenHeader';
import WeekDataContainer from './WeekDataContainer';

const LandingScreen = () => {
    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
        safeAreaBottom: true
    });

    const { user } = useUserStore();
    const [weekStartDate, setWeekStartDate] = React.useState<moment.Moment>(getWeekStart());

    const isFirstWeek = user ? weekStartDate.isSameOrBefore(moment(user.createdDateEpoch), 'week') : true;
    const isCurrentWeek = weekStartDate.isSame(moment(), 'week');

    const prevWeek = () => {
        setWeekStartDate((date) =>
            date
                .clone()
                .subtract(1, 'week')
                .startOf('day')
        );
    };

    const nextWeek = () => {
        setWeekStartDate((date) =>
            date
                .clone()
                .add(1, 'week')
                .startOf('day')
        );
    };

    return (
        <ScreenWrapper>
            <VStack space={2} paddingX={2}>
                <LandingScreenHeader
                    startDate={weekStartDate}
                    isFirstWeek={isFirstWeek}
                    isCurrentWeek={isCurrentWeek}
                    prevWeek={prevWeek}
                    nextWeek={nextWeek}
                />
                <WeekDataContainer
                    weekStart={weekStartDate}
                    isCurrentWeek={isCurrentWeek}
                />
            </VStack>
            <Slide in={!isCurrentWeek} placement="bottom">
                <Center w="100%" position="absolute" bottom={0} {...safeAreaProps}>
                    <Button
                        bg="black:alpha.50"
                        _pressed={{
                            bg: 'black:alpha.40'
                        }}
                        onPress={() => setWeekStartDate(getWeekStart)}
                    >
                        Today
                    </Button>
                </Center>
            </Slide>
        </ScreenWrapper>
    );
};

export default LandingScreen;
