# encoding: utf-8

require 'rspec'
require_relative '../robot'

describe Robot do
  its(:x) { should be 0 }
  its(:y) { should be 0 }
  its(:direction) { should eq 'NORTH' }

  let(:robot) { Robot.new(1, 2, 'NORTH') }

  describe 'pre-set initial coordinates' do
    specify 'correct initial coordinates' do
      robot.x.should be 1
      robot.y.should be 2
    end
    specify 'correct initial direction' do
      robot.direction.should eq 'NORTH'
    end
  end

  describe 'commands' do
    specify 'skip unknown command' do
      expect { robot.command 'UNKNOWN' }.to_not raise_error
      robot.x.should be 1
      robot.y.should be 2
      robot.direction.should eq 'NORTH'
    end

    context 'PLACE' do
      specify 'sets correct initial coordinates' do
        robot.command 'PLACE', 2, 3, 'EAST'

        robot.x.should be 2
        robot.y.should be 3
        robot.direction.should eq 'EAST'
      end
    end

    context 'LEFT' do
      specify 'turns left several times without moving from its current spot' do
        2.times { robot.command 'LEFT' }

        robot.direction.should eq 'SOUTH'
        robot.x.should be 1
        robot.y.should be 2
      end
    end

    context 'RIGHT' do
      specify 'turns right several times without moving from its current spot' do
        3.times { robot.command 'RIGHT' }

        robot.direction.should eq 'WEST'
        robot.x.should be 1
        robot.y.should be 2
      end
    end

    context 'MOVE' do
      specify 'moves one cell forward keeping the same direction' do
        robot.command 'MOVE'

        robot.x.should be 1
        robot.y.should be 3
        robot.direction.should eq 'NORTH'
      end
    end

    context 'sequence of commands' do
      specify 'drives safely' do
        robot.command 'LEFT'
        robot.command 'MOVE'
        robot.command 'RIGHT'
        robot.command 'MOVE'

        robot.x.should be 0
        robot.y.should be 3
        robot.direction.should eq 'NORTH'
      end
    end

  end

end
