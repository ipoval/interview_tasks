# encoding: utf-8

require 'rspec'
require_relative 'rover'

describe Rover do
  its(:x) { should be 0 }
  its(:y) { should be 0 }
  its(:direction) { should eq 'N' }

  let(:rover) { Rover.new(1, 2, 'N') }

  describe 'receives initial coordinates' do
    specify 'has correct initial coordinates' do
      rover.x.should be 1
      rover.y.should be 2
    end
    specify 'has correct initial direction' do
      rover.direction.should eq 'N'
    end
  end

  describe 'commands string' do
    specify 'error raised unless understands received command' do
      expect { rover.command 'T' }.to raise_error ArgumentError
    end

    context 'L' do
      specify 'turns left several times without moving from its current spot' do
        2.times { rover.command 'L' }

        rover.direction.should eq 'S'
        rover.x.should be 1
        rover.y.should be 2
      end
    end

    context 'R' do
      specify 'turns right several times without moving from its current spot' do
        3.times { rover.command 'R' }

        rover.direction.should eq 'W'
        rover.x.should be 1
        rover.y.should be 2
      end
    end

    context 'M' do
      specify 'moves forward one grid point and maintain the same heading' do
        rover.command 'M'

        rover.x.should be 1
        rover.y.should be 3
        rover.direction.should eq 'N'
      end
    end

    context 'LMLMLMLMM' do
      specify 'drive safely' do
        rover.command 'LMLMLMLMM'

        rover.x.should be 1
        rover.y.should be 3
        rover.direction.should eq 'N'
      end
    end

    context 'MMRMMRMRRM' do
      let(:rover) { Rover.new(3, 3, 'E') }

      specify 'drive safely' do
        rover.command 'MMRMMRMRRM'

        rover.x.should be 5
        rover.y.should be 1
        rover.direction.should eq 'E'
      end
    end

  end

end
