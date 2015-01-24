# encoding: utf-8

require 'rspec'
require_relative '../grid'

describe Grid do
  describe 'acts as a singleton' do
    specify 'can not create a new object of this type' do
      expect { Grid.new }.to raise_error
    end
  end

  let(:grid) { Grid.instance }

  describe 'pre-set initial coordinates' do
    specify 'initialized with proper coordinates' do
      grid.x_min.should be 0
      grid.y_min.should be 0
      grid.x_max.should be 4
      grid.y_max.should be 4
    end
  end

  describe '#inside?' do
    specify 'true when inside the grid' do
      grid.inside?(2, 3).should be_true
    end
    specify 'false when outside the grid' do
      grid.inside?(5, 0).should be_false
    end
  end
end
